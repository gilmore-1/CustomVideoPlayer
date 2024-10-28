import React, { useRef, useState, useEffect } from 'react';

import video360 from '../../assets/video/360.mp4'
import video720 from '../../assets/video/720.mp4'
import { QualitySelector, QualitySelectorButton, TimeIndicator, VideoPlayerContainer } from './VideoPlayerStyled';


const VideoPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [quality, setQuality] = useState<'360p' | '720p'>('720p');

    // Update current time and duration when video plays
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateCurrentTime = () => setCurrentTime(video.currentTime);
        const setVideoDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateCurrentTime);
        video.addEventListener('loadedmetadata', setVideoDuration);

        return () => {
            video.removeEventListener('timeupdate', updateCurrentTime);
            video.removeEventListener('loadedmetadata', setVideoDuration);
        };
    }, []);

    // Handle quality change
    const handleQualityChange = (newQuality: '360p' | '720p') => {
        const video = videoRef.current;
        if (!video) return;

        // Save the current time to resume after switching quality
        const currentPlaybackTime = video.currentTime;

        // Change the quality and update the source
        setQuality(newQuality);
        video.src = newQuality === '720p' ? video720 : video360;
        console.log(video.src)
        // Resume playback at the saved time
        video.currentTime = currentPlaybackTime;
        
        video.play();
    };

    // Format time as mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <VideoPlayerContainer>
            <video ref={videoRef} width="720" controls>
                <source src={quality === '720p' ? video720 : video360} type="video/mp4" />
            </video>
            <TimeIndicator>
                {formatTime(currentTime)} / {formatTime(duration)}
            </TimeIndicator>

            <QualitySelector>
                <QualitySelectorButton onClick={() => handleQualityChange('360p')}>360p</QualitySelectorButton>
                <QualitySelectorButton onClick={() => handleQualityChange('720p')}>720p</QualitySelectorButton>
            </QualitySelector>
        </VideoPlayerContainer>
    );
};

export default VideoPlayer;


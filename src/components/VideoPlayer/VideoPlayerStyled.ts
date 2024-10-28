import styled from 'styled-components';

export const VideoPlayerContainer = styled.div`
        position: relative;
        display: inline-block;
`
export const TimeIndicator = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-family: Arial, sans-serif;
`;
export const QualitySelector = styled.div`
     position: absolute;
    bottom: 50px;
    right: 10px;
    display: flex;
    gap: 10px;
`
export const QualitySelectorButton = styled.div`
        background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    :hover{
    background-color: rgba(255, 255, 255, 0.3);

    }
`
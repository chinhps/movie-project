export interface ISubtitle {
    startTime: number;
    endTime: number;
    text: string;
}

export const handleAddSubtitles = ({
    videoElement,
    subtitlesData,
    language,
    label,
}: {
    videoElement: HTMLVideoElement;
    subtitlesData: Array<ISubtitle>;
    language: string;
    label: string;
}) => {
    let track = videoElement.addTextTrack("captions", label, language);
    track.mode = "showing";
    subtitlesData.forEach((sub) => {
        const cue = new VTTCue(sub.startTime, sub.endTime, sub.text);
        cue.line = 80;
        cue.snapToLines = false;

        track.addCue(cue);
    });
};

export const removeAllSubtitles = (videoElement: HTMLVideoElement) => {
    const tracks = videoElement.textTracks;
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = "disabled";
    }
};

export const handleFullScreenAll = (playerContainer: HTMLDivElement, video: any, handleIos: () => void) => {
    if (playerContainer.requestFullscreen) {
        playerContainer.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        handleIos();
    }
}

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${hours > 0 ? `${hoursFormatted}:` : ""
        }${minutesFormatted}:${secondsFormatted}`;
};

export function parseVTT(vttString: string): ISubtitle[] {
    const lines = vttString.split('\n');
    const cues: ISubtitle[] = [];
    let currentCue: ISubtitle | null = null;
    lines.forEach((line) => {
        if (!line.trim() || line.startsWith('WEBVTT') || line.startsWith('NOTE')) return;
        const timeMatch = line.match(/(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})/);
        if (timeMatch) {
            currentCue = {
                startTime: convertTimeToSeconds(timeMatch[1]),
                endTime: convertTimeToSeconds(timeMatch[2]),
                text: ''
            };
            cues.push(currentCue);
        } else if (currentCue) {
            currentCue.text += line + '\n';
        }
    });
    return cues;
}

function convertTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':');
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
    return totalSeconds;
}

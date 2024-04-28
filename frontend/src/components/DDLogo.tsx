import { useTheme } from "@emotion/react";
import * as React from "react";
function DDLogo({width = "100", body = "#000", wings = "#000"}: any) {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            viewBox="0 0 599.26 580.72"
            width={width}
            style={{transform: "rotate(3deg)", verticalAlign: "middle", margin: "0 5px -0.5em 5px"}}
        >
            <defs>
                <style>{`.cls-1{stroke-width:0} .body{ fill: ${body}} .wings{ fill: ${wings}}`}</style>
            </defs>
            <path
                d="M428.08 465.27c7.12 18.6 10.58 36.85-2.82 54.34 2.46-10.74 1.92-21.18-2.75-31.67-.55.66-1.05 1.03-1.21 1.51-11.25 33.78-34.09 57.66-65.13 73.55-41.24 21.11-83.97 24.43-126.41 4.15-37.27-17.82-60.03-47.81-65.59-89.17-3.31-24.57 1.74-47.83 16.78-68.95-3.02 10.54-5.86 20.48-8.7 30.42.36.1.71.19 1.07.29 2.74-6.82 5.08-13.83 8.29-20.42 12.59-25.85 32.22-42.56 61.25-47.66 34.9-6.13 70.13 12.51 81.54 43.82 7.71 21.16 2.73 43.39-12.95 57.8-18.03 16.56-46.94 14.7-60.26-3.88-8.4-11.72-8.1-26.64.74-36.26 6.03-6.57 15.1-9.09 22.69-6.31 6.77 2.48 10.67 8.4 10.3 16.21-.91-1.05-1.57-1.81-2.24-2.57-5.27-5.96-11.95-7.52-18.24-4.26-5.91 3.06-9.26 10.87-7.67 17.85 3.11 13.66 17.92 21.75 32.28 17.64 14.22-4.07 22.74-17.26 21.45-33.24-1.55-19.23-16.33-35.33-36.61-40.3-41.11-10.08-79.72 18.54-86.87 58.07-7.49 41.37 13.44 78.26 53.06 95.49 55.93 24.32 124.6.21 151.65-54.3 17.7-35.67 14.76-71.31-4.6-105.77-3.47-6.18-7.33-12.13-11.04-18.17-.13-.22-.51-.28-2.09-1.1 3.72 10.91 7.09 20.82 10.51 30.86-20.98-21.03-27.75-49.37-39.52-76.47-3.96 13.6-3.18 26.14.18 38.71-.42.17-.85.33-1.27.5-2.33-5.39-5.22-10.62-6.88-16.22-4.99-16.89-3.11-33.86.15-50.82.59-3.05.41-6.4-.12-9.49-2.13-12.59-4.53-25.14-6.84-37.7-.1-.53-.32-1.04-.82-2.61-26.08 58.22-69.82 91.88-132.77 100.23 6.11-7.3 12.23-14.6 18.34-21.9-.21-.25-.43-.5-.64-.75-.91.62-1.88 1.16-2.71 1.87-10.96 9.42-23.21 16.8-36.29 22.83-2.2 1.01-4.66 1.72-7.06 1.97-22.56 2.31-56.87-1.54-78.92-8.89 1.32-1.51 2.37-2.87 3.59-4.08 24.13-24.09 52.13-42.84 81.99-58.91 40.15-21.6 82.93-35.27 128.07-41.52 7.63-1.06 15.35-1.47 23.03-2.07 1.98-.16 3.63-.14 3.62-2.89-.06-17.85-.03-35.7-.03-53.55-.44-.18-.88-.35-1.31-.53-1.94 3.1-3.88 6.21-6.28 10.04-2.42-11.11-.63-20.75 6.04-30.62-15.94 5.02-30.84 3.37-45.85-.08 12.11-1.68 23.69-4.66 33.38-12.91-14.33 3.28-28.17 2.19-41.5-4.9 2.89 0 5.78-.03 8.67 0 20.12.28 37.34-6.82 51.98-20.44 1.8-1.67 3.65-3.44 4.91-5.5 1.04-1.71 2.19-4.37 1.53-5.8-.64-1.39-3.53-2.49-5.41-2.45-7.54.16-15.13.33-22.57 1.39-18.55 2.63-37.01 4.77-55.62.5-16.81-3.86-31.74-11.62-45.7-21.48-.33-.23-.5-.69-1.26-1.77 7.56 2.39 14.5 4.27 21.22 6.75 27.25 10.07 55.02 10.74 83.41 6.05 10.08-1.67 20.52-1.25 30.8-1.68 5.38-.22 10.79-.02 16.16-.35 7.78-.49 15.13.4 21.4 5.5 4.37 3.55 9.48 3.18 14.11 1.75 4.33-1.34 6.96-.3 9.63 2.83 3.11 3.66 5.67 7.43 4.15 12.53-2.93 9.8-12.24 16.63-22.42 16.57-18.57-.12-29.17 15.54-21.78 32.54 1.94 4.47 4.52 8.86 7.62 12.61 12.84 15.49 23.54 32.03 27.71 52.98 29.29-7.78 58.81-9.73 88.63-7.86 29.73 1.86 58.31 8.44 86.97 20.44-7.27 6.15-13.46 11.91-20.17 16.98-24.27 18.35-51.29 29.2-82.13 29.04-24.18-.13-46.11-7.11-65.56-21.62-1.58-1.18-3.16-2.37-5.14-3.85-6.54 22.87-11.82 45.41-.78 67.78 6.04 12.25 13.64 23.73 20.4 35.63 5.24 9.22 10.31 18.55 15.37 27.87.77 1.41 1.09 3.07 1.42 4.05-16.64-16.18-33.49-32.56-50.34-48.93l-1.19.91c4.4 5.96 8.37 12.3 13.3 17.79 8.23 9.18 17.39 17.54 25.59 26.75 13.27 14.93 20.99 32.22 19.91 52.65-.23 4.43-1.17 8.81-2.28 13.4-4.75-11.41-8.26-23.54-20.19-29.79 3.84 8.61 7.98 17.07 11.41 25.81 3.48 8.89 3.85 18.13.88 27.46-2.07-8.76-3.85-17.59-10.65-24.23ZM244.33 298.7c5.45-14.46 16.51-23.97 28.47-32.94-12.65 5.24-25 10.76-36.87 17.17-23.29 12.56-45.88 26.49-71.19 34.89-5.2 1.72-10.37 3.51-15.56 5.27 31.01 7.17 57.43-5.25 84.23-18.63l-9.91 24.99c.98.08 1.32.22 1.54.11 1.25-.59 2.49-1.21 3.71-1.86 17.35-9.19 32.41-21.28 45.45-35.94 9.88-11.1 19.83-22.12 29.85-33.28-23.15 8.61-43.64 21.06-59.72 40.23Zm227.52-19.32c-6.59-7.24-12.41-13.64-17.74-19.5 12.15.71 24.49 1.93 36.84 2.02 12.59.1 24.27-3.8 34.71-10.22-16.09-.5-32.25-.6-48.36-1.6-16.17-1-32.29-2.9-48.43-4.4 0 .27-.01.53-.02.8 7.46 3.61 14.92 7.23 22.37 10.84l-.61 1.87c-12.2-4.19-24.24-9.15-38.54-9.08 18.67 13.36 36.52 25.49 59.77 29.28ZM295 249.12c-38.14 3.53-123.68 38.76-143.48 59.54 17.64-5.75 35.41-11.3 52.41-18.63 20.89-9.01 41.05-19.7 61.72-29.26 9.31-4.31 19.08-7.62 29.35-11.65Zm62.58-101.67c-6.43 6.23-8.53 13.02-8.56 20.47-.1 22.53-.25 45.06.02 67.59.13 10.93.71 21.9 1.93 32.75.82 7.27 3.12 14.38 4.76 21.56.5-.1 1-.19 1.49-.29 0-1.18-.02-2.35 0-3.53.28-12.49.85-24.98.78-37.47-.08-15.41.04-30.87-1.25-46.2-1.53-18.02-5.88-35.93.82-54.89Zm17.33 98.6c-1.73 7.24-6.35 14.17-2.36 21.63 4.56 8.54 10.04 16.6 15.49 25.46 9.23-19.04 3.61-38.54-13.12-47.09Zm43.73-8.05c33.27 1.59 66.55 8.05 99.97.6-33.28-6.79-66.59-5.59-99.97-.6ZM402.5 119.64c-13.53-.73-26.45-3.41-38.99 2.07-10.74 4.7-23.26 16.76-27.05 26.83 2.18-1.9 3.9-3.65 5.85-5.06 4.78-3.44 10.1-5.75 15.42-8.27 10.89-5.15 21.38-9.94 33.72-9.57 4.35.13 8.39-1.29 11.05-6.01Zm-8.16 131.85c3.04-17.5-10.25-34.24-20.44-37.35-4.27 6.58-3.47 12.52 2.98 19.42 5.66 6.04 11.54 11.88 17.46 17.93Zm-18.67 42.16c-6.81 9.83 3.67 33.78 20.97 49.73-3.04-10.38-6.13-21.39-9.51-32.31-2.07-6.71-6.07-12.27-11.46-17.42Zm-11.35-112.16-1.13.82c1.02 12.74 9.47 19.81 19.39 25.75.38-.29.76-.58 1.15-.86-6.47-8.57-12.93-17.14-19.4-25.71Zm52.66 220.48c4.47 10.55 11.9 18.38 21.73 24.05-5.38-9.67-12.37-17.93-21.73-24.05Zm-55.22-295.95c6.06.84 10.98 1.53 16.75 2.33-4.99-7.09-9.51-7.72-16.75-2.33Z"
                className="cls-1 body"
            />
            <path
                d="M0 93.26c123.82-15.99 225.86 28.17 313.67 111.87-.14.4-.27.8-.41 1.2-1-.34-2.03-.6-2.98-1.04-29.66-13.63-59.17-27.57-88.99-40.84-30.25-13.45-62.04-20.28-95.24-19.08-15.95.57-31.13 5.18-46.99 11.01 2.09 1.47 3.44 2.59 4.94 3.46 15.21 8.9 31.82 10.95 49.06 10.03 24.36-1.29 48.76-2.4 72.87 2.39 10.83 2.15 21.4 5.63 32.06 8.57 1.27.35 2.41 1.13 3.44 2.63-3.95-.41-7.89-.83-11.84-1.24 35.12 10.06 68.7 23.17 98.37 46.34-1.49.23-2.45.58-3.36.49-49.36-5-96.62 3.59-142.67 21.27-22.29 8.56-45.2 15.28-68.98 18.55-24.02 3.3-47.99 2.49-71.97-.4-.42-.05-.81-.3-1.32-1.02 63.57-4.17 123.63-23.17 184.97-42.58C127.14 217.92 51.7 175.88 0 93.26Zm242.18 70.96c-25.12-20.11-53-34.95-83.64-44.42-32.7-10.11-65.93-17.13-100.49-14.3-5.83.48-11.62 1.53-18.37 2.44 10.05 11.75 21.79 18.75 35.27 21.3 21.16 4 42.57 6.79 63.95 9.48 21.11 2.66 42.27 5.05 62.65 11.37 13.61 4.23 26.95 9.34 40.62 14.13Zm23.29 46.34c-12.74-3.85-25.34-8.32-38.28-11.35-9.64-2.26-19.71-3.44-29.61-3.61-6.69-.11-13.43 2.38-20.14 3.71 28.86 10 58.47 10.45 88.03 11.25Zm-134.48-24.94c1.11.52 2.02 1.02 2.98 1.38 10.87 4.08 21.98 5.59 33.55 3.69 9.85-1.62 19.77-2.85 30.05-4.31-16.16-7.62-51.79-7.99-66.58-.76ZM400.56 215.88c10.22-22.46 24.08-41.66 38.17-60.85-2.03 2.31-4.06 4.63-6.08 6.94-.41-.3-.83-.6-1.24-.9 1.03-1.78 1.91-3.67 3.1-5.33 9.88-13.76 22.83-24.15 36.94-33.21 9.47-6.07 19.24-11.68 28.52-18.02 10.93-7.46 20.21-16.59 26.38-29.72-1.98.58-3.18.91-4.37 1.29-35.24 11.22-62.02 33.51-82.87 63.49-11 15.82-21.87 31.72-32.81 47.59-1.01 1.47-2.03 2.93-3.05 4.39-.53-.22-1.05-.45-1.58-.67 3.63-11.21 6.29-22.85 11.05-33.55C440.75 94.36 483.37 43.45 540.59 4.89c2.99-2.01 6.2-3.68 10.02-4.89 2.49 88.91-38.72 152.66-112.72 197.57 33.54-5.07 67.27-9.45 100.7-15.51 19.62-3.56 38.75-9.79 58.1-14.82.7-.18 1.39-.43 2.55.14-1.95 1.23-3.84 2.57-5.86 3.68-19.54 10.84-39.06 22.04-61.54 25.47-15.82 2.42-31.83 3.83-47.8 5.06-27.24 2.1-54.32 4.87-80.38 13.78-.69.24-1.46.25-3.12.51ZM532.49 30.51c-34.07 12.62-94.56 78.64-101.29 110.52 17.07-22.06 36.4-41.18 57.74-58.36 9.95-8.01 19.63-16.44 28.81-25.32 7.35-7.11 12.68-15.78 14.73-26.84Zm-32.55 89.72c-16.23 3.89-36.67 18.97-42.42 30.38 7.24-3.69 15.15-7.66 23.02-11.74 8.1-4.2 14.67-10.04 19.4-18.64Zm-69.25 65.5c16.07-10.13 31.96-20.41 45.73-35.32-21.33 5.25-33.88 19.88-45.73 35.32ZM361.45 94.92c-6.86.39-13.71.92-20.57 1.15-10.48.34-20.97.26-31.44.73-24.48 1.11-47.25-3.32-66.55-19.63-3.53-2.98-7.01-6.02-10.51-9.04.41-.48.81-.96 1.22-1.45.83.38 1.71.69 2.48 1.16 25.02 15.25 51.77 23.17 81.42 20.38 12.4-1.17 24.97-1.38 37.14 2.45 2.31.73 4.53 1.71 6.79 2.58 0 .56.02 1.11.03 1.67Z"
                className="cls-1 wings"
            />
        </svg>
    );
}
export default DDLogo;

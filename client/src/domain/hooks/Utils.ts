import process from "process";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean {
    return development;
}

export function renameFile(originalFile: File, newName: string) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
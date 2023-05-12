import {useEffect, useRef, useState} from "react";

export interface FilesDragAndDropProps {
    onUpload: (file: File) => void
    count: number
    formats: string[]
}

export default function FilesDragAndDrop({onUpload, formats, count}: FilesDragAndDropProps) {

    const [isFileSelected, setIsFileSelected] = useState(false)
    const drop = useRef<any>(null)

    useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
        return () => {
            drop.current.removeEventListener('dragover', handleDragOver);
            drop.current.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleDragOver = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const files = [...event.dataTransfer.files];

        // check if the provided count prop is less than uploaded count of files
        if (count && count < files.length) {
            console.log(`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`);
            return;
        }

        // check if some uploaded file is not in one of the allowed formats
        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
            return;
        }

        if (files && files.length) {
            setIsFileSelected(true)
            onUpload(files[0]);
        }

    };

    return <div
        ref={drop}
        className="w-[300px] h-[50px] p-5 m-auto flex justify-center items-center border-2 border-dashed border-[#c3c3c3] rounded-3xl cursor-pointer">
        {!isFileSelected && <p>Drop resume in PDF</p>}
        {isFileSelected && <p>Resume selected!</p>}
    </div>
}
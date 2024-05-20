import { AiEffectType } from "@/types";

export async function uploadFile(videoObject:   any, type: AiEffectType) {
    // Extract the blob URL from the videoObject
    const blobUrl = videoObject.src;

    try {
        // Fetch the blob data from the blob URL
        const blob = await fetch(blobUrl).then((res) => res.blob());

        // Create a new file object from the blob
        const file = new File([blob], "video.mp4", { type: "video/mp4" });

        // Prepare the FormData with the file and the extra parameter
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type); // Append the additional parameter

        // Post the form data with the file to the FastAPI endpoint
        const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
        // const response = await fetch("http://127.0.0.1:8000/files/", {
            method: "POST",
            body: formData,
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            console.log("File uploaded successfully:", data);
        } else {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}
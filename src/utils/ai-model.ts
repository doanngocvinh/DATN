import { AiEffectType } from "@/types";

const Model = {
    none: "app/model/deploy/AnimeGANv3_Hayao_36.onnx",
    hayao: "app/model/deploy/AnimeGANv3_Hayao_36.onnx",
    shinkai: "app/model/deploy/AnimeGANv3_Shinkai_37.onnx",
    paprika: "app/model/deploy/AnimeGANv3_Paprika.onnx",
    portraitSketch: "app/model/deploy/AnimeGANv3_PortraitSketch.onnx",
    jpFace: "app/model/deploy/AnimeGANv3_JP_face.onnx",
}

export async function uploadFile(videoObject: any, type: AiEffectType) {
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
    formData.append("type", Model[type]); // Append the additional parameter

    // Post the form data with the file to the FastAPI endpoint
    const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    });

    // Handle the response
    if (response.ok) {
      const jsonResponse = await response.json();

      // Extract the object name from the JSON response
      const objectName = jsonResponse.object_name;
      console.log(objectName);

      // Fetch the pre-signed URL for accessing the uploaded file
      const presignedUrlResponse = await fetch(
        `http://127.0.0.1:8000/get_presigned_url/?file_name=${encodeURIComponent(
          objectName
        )}`
      );

      if (!presignedUrlResponse.ok) {
        throw new Error(
          `Failed to get pre-signed URL: ${presignedUrlResponse.statusText}`
        );
      }

      const presignedUrlJson = await presignedUrlResponse.json();
      const presignedUrl = presignedUrlJson.url;
      console.log(presignedUrl);

      // Assign the pre-signed URL back to videoObject's src attribute
      videoObject.setSrc(presignedUrl);
    } else {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

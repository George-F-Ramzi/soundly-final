"use client";

import React, { useEffect, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";

interface Prop {
  audio: string;
  image: string;
  uploading: boolean;
}

export default function UploadButtonUI({ audio, image, uploading }: Prop) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (audio !== "" && image !== "") setShow(true);
    else setShow(false);
  }, [audio, image]);

  if (show)
    return (
      <div className="flex cursor-none flex-row-reverse mt-10">
        <button
          disabled={uploading}
          type="submit"
          className="px-12 py-4 font-bold bg-button rounded-full"
        >
          {uploading ? (
            <RiLoader2Fill
              size={24}
              className="animate-spin"
            />
          ) : (
            "Upload"
          )}
        </button>
      </div>
    );

  return <></>;
}

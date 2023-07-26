"use client";

import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { RiFileMusicLine, RiImageLine, RiLoader2Fill } from "react-icons/ri";
import { UploadButton } from "@/utils/uploadthing";
import UploadButtonUI from "@/components/UI/uploadButton";
import Joi, { Schema } from "joi";
import { toast } from "react-toastify";

export default function Upload() {
  const { token, setShow }: ITokenContext = useContext(TokenContext);
  const navigate = useRouter();
  const [image, setImage] = useState<string>("");
  const [audio, setAudio] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate.push("/");
      setShow && setShow(true);
    }
  }, [setShow, token, navigate]);

  const handleUpload = async () => {
    setUploading(true);
    let data = { name, audio, image };

    const schema: Schema = Joi.object({
      name: Joi.string().required().min(1).max(16),
      audio: Joi.string().required().min(8).max(900).label("audio"),
      image: Joi.string().required().min(8).max(900).label("image"),
    });

    const { error } = schema.validate(data);
    if (error) {
      toast("Invalid Input", { type: "error" });
      setUploading(false);
      return;
    }

    try {
      let res = await fetch(`https://soundly-peach.vercel.app/api/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setUploading(false);
      let { id } = await res.json();
      navigate.push(`/artist/${id}`);
    } catch (error) {
      setUploading(false);
      throw Error;
    }
  };

  return (
    <div>
      <h2 className='text-white mt-[55px] font-bold text-4xl mb-[15px] '>
        Upload
      </h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleUpload();
        }}
        className='mt-4'
      >
        <input
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          minLength={1}
          maxLength={16}
          name='name'
          placeholder='Enter Song Name'
          className='h-14 w-full valid:text-white bg-transparent  cursor-pointer hover:border-active px-6 flex items-center text-para border border-default rounded-full'
        />
        <div className='h-14 w-full input-field relative border-dashed border bg-[#1A1A1A] valid:text-white mt-5 cursor-pointer hover:border-active flex items-center   border-default rounded-full'>
          <UploadButton
            endpoint='audio'
            onClientUploadComplete={(res) => {
              setLoadingAudio(false);
              if (res) setAudio(res[0].fileUrl);
            }}
            onUploadProgress={() => {
              setLoadingAudio(true);
            }}
            onUploadError={(error: Error) => {
              alert("Song Didn't Uploaded Successfully Try Again");
            }}
          />
          {!loadingAudio ? (
            <section className='flex w-full h-14 items-center px-6'>
              <p
                className={`font-medium h-full w-full ${
                  audio ? "" : "pt-4"
                }  relative overflow-hidden mr-10 grow text-para`}
              >
                {audio ? audio : "Select song file: Max 32mb"}
              </p>
              <RiFileMusicLine
                size={24}
                className='text-para absolute top-4 right-4'
              />
            </section>
          ) : (
            <span className='absolute flex items-center justify-center rounded-full font-bold  bg-green-400 top-0 left-0 h-full w-full'>
              <RiLoader2Fill
                className='mr-3 animate-spin'
                size={24}
              />
              Uploading The Song
            </span>
          )}
        </div>
        <div className='h-14 w-full input-field relative border-dashed border bg-[#1A1A1A] valid:text-white mt-5 cursor-pointer hover:border-active flex items-center   border-default rounded-full'>
          <UploadButton
            endpoint='image'
            onClientUploadComplete={(res) => {
              setLoadingImage(false);
              if (res) setImage(res[0].fileUrl);
            }}
            onUploadProgress={() => {
              setLoadingImage(true);
            }}
            onUploadError={(error: Error) => {
              alert("Image Didn't Uploaded Successfully Try Again");
            }}
          />
          {!loadingImage ? (
            <section className='flex relative w-full h-14 items-center px-6'>
              <p
                className={`font-medium h-full w-full ${
                  image ? "" : "pt-4"
                }  relative overflow-hidden mr-10 grow text-para`}
              >
                {image ? image : "Select cover file: Max 4mb"}
              </p>
              <RiImageLine
                size={24}
                className='text-para absolute top-4 right-4'
              />
            </section>
          ) : (
            <span className='absolute flex items-center justify-center rounded-full font-bold  bg-green-400 top-0 left-0 h-full w-full'>
              <RiLoader2Fill
                className='mr-3 animate-spin'
                size={24}
              />
              Uploading The Image
            </span>
          )}
        </div>
        <UploadButtonUI
          audio={audio}
          image={image}
          uploading={uploading}
        />
      </form>
    </div>
  );
}

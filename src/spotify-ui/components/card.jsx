import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Icons } from "@/components/icons";
import { ResponsiveImage } from "@/components/responsive-image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function Card({ id, image, title, text }) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [intervalId, setIntervalId] = useState(undefined);
  const [latestRecom, setLatestRecom] = useState();
  const userIdRef = useRef();

  const sendData = async () => {
    try {
      const payload = {
        user_id: data.user_id,
        song_id: parseInt(id),
        clicks: data?.clicks,
        ratings: data?.ratings,
        likes: data?.likes,
        orders: data?.orders,
      };
      console.log(payload);
      const response = await axios.post("http://127.0.0.1:5000/produce_spark", [
        payload,
      ]);
      console.log(response.data);
      toast.success("server recieved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (str, value) => {
    setData((prev) => ({ ...prev, [str]: parseInt(value) }));
  };

  const get_user_recom = async () => {
    console.log("meow");
    if (!userIdRef.current) return;
    console.log("getting latest recomendation");
    const result = await axios.post("http://127.0.0.1:5000/get_user_recom", {
      user_id: userIdRef.current,
    });
    console.log(result.data);
    if (result.data?.books?.length > 0) {
      setLatestRecom(result.data);
    } else {
      setLatestRecom(undefined);
    }
  };

  useEffect(() => {
    console.log("bhau");
    const id = setInterval(async () => {
      await get_user_recom();
    }, 2000);
    setIntervalId(id);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    userIdRef.current = data?.user_id;
  }, [data]);

  return (
    <div className="relative">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="group py-4 px-4 bg-[#181818] rounded-md hover:bg-[#282828] transition-colors cursor-pointer">
            <div className="relative w-full bg-gradient-to-br from-violet-800 to-teal-500/80 rounded-md">
              <ResponsiveImage
                ratio={1 / 1}
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 910px) 50vw,
              (max-width: 1115px) 33vw,
              (max-width: 1320px) 25vw,
              (max-width: 1522px) 20vw,
              16vw"
              />

              <div
                onClick={() => setShowModal(true)}
                className="opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-3 right-3 h-14 w-14 rounded-full bg-green-500 z-10 shadow-md flex items-center justify-center"
              >
                <Icons.play className="h-5 w-5 text-black" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="font-semibold text-white truncate" title={title}>
                {title}
              </p>
              <p className="font-semibold text-stone-400 text-sm line-clamp-2">
                {text}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Add to queue</ContextMenuItem>
          <ContextMenuItem>Go to playlist radio</ContextMenuItem>
          <ContextMenuItem>
            <div className="w-full flex flex-row items-center justify-between">
              <span>Report</span>
              <Icons.externalLink className="h-4 w-4 text-white" />
            </div>
          </ContextMenuItem>
          <ContextMenuItem>Add to Your Library</ContextMenuItem>
          <ContextMenuItem>Exclude from your taste profile</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Copy link to playlist</ContextMenuItem>
              <ContextMenuItem>Embed playlist</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>About recommendations</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Open in Desktop app</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {showModal && (
        <div className="fixed z-20 top-0 left-0 h-screen overflow-y-auto w-full backdrop-blur-lg flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3 justify-between bg-[#181818] border-neutral-800 border w-2/5 rounded-md p-7 my-10">
            <div className="relative">
              <img
                className=" rounded-md max-h-60 object-cover w-full"
                src={image.src}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#9ca3af"
                className="w-8 h-8 absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <p
                className="font-semibold text-white truncate text-xl"
                title={title}
              >
                {title}
              </p>
              <p className="font-semibold text-stone-400 text-sm line-clamp-2">
                - {text}
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-between text-white w-full">
              <div className="flex justify-between w-full items-center  gap-3 ">
                <span className="">User Id:</span>
                <input
                  onChange={(e) => handleInputChange("user_id", e.target.value)}
                  className="bg-[#0d0d0d] px-3 py-1 rounded-md border-neutral-800 border"
                />
              </div>
              <div className="flex justify-between w-full items-center  gap-3 ">
                <span className="">Likes:</span>
                <input
                  onChange={(e) => handleInputChange("likes", e.target.value)}
                  className="bg-[#0d0d0d] px-3 py-1 rounded-md border-neutral-800 border"
                />
              </div>
              <div className="flex justify-between w-full items-center gap-3">
                <span className="">Plays:</span>
                <input
                  onChange={(e) => handleInputChange("clicks", e.target.value)}
                  className="bg-[#0d0d0d] px-3 py-1 rounded-md border-neutral-800 border"
                />
              </div>
              <div className="flex justify-between w-full items-center gap-3">
                <span className="">Rating:</span>
                <input
                  onChange={(e) => handleInputChange("ratings", e.target.value)}
                  className="bg-[#0d0d0d] px-3 py-1 rounded-md border-neutral-800 border"
                />
              </div>
              <div className="flex justify-between w-full items-center gap-3">
                <span className="">Shares:</span>
                <input
                  onChange={(e) => handleInputChange("orders", e.target.value)}
                  className="bg-[#0d0d0d] px-3 py-1 rounded-md border-neutral-800 border"
                />
              </div>
            </div>
            <button
              onClick={sendData}
              className=" bg-white hover:bg-gray-300 font-medium py-1 rounded-md"
            >
              Simulate Traffic
            </button>
            <div className="flex ">
              {latestRecom?.books && latestRecom?.books.length > 0 ? (
                <div className="flex flex-col items-center w-full gap-1 text-white">
                  <span className=" font-medium">
                    Recomended Songs for user {data?.user_id}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {latestRecom?.books.map((a) => (
                      <span className=" bg-indigo-800 border border-indigo-600 px-2 py-1 rounded-sm text-center font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className=" text-center text-white">
                    New User? Simulate an interaction with this song to be able to see
                    your updated recomendations
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

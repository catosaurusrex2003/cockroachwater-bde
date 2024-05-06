import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type eachdocument = {
  user_id?: number;
  book_id?: number;
  clicks?: number;
  ratings?: number;
  likes?: number;
  orders?: number;
};

function Mehdi() {
  const [data, setData] = useState<eachdocument>({});
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [latestRecom, setLatestRecom] = useState<
    { user_not_found: string } | any
  >();
  const userIdRef = useRef<number>();

  const sendData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/produce_spark", [
        {
          user_id: data.user_id,
          book_id: data?.book_id,
          clicks: data?.clicks,
          ratings: data?.ratings,
          likes: data?.likes,
          orders: data?.orders,
        },
      ]);
      console.log(response.data);
      toast.success("server recieved");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (str: string, value: string) => {
    setData((prev) => ({ ...prev, [str]: parseInt(value) } as eachdocument));
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
    <div className="flex flex-col w-1/3 mx-auto mt-20 bg-gray-100 border border-gray-300 rounded-sm p-5 gap-3">
      <div className="flex justify-between items-center gap-1 w-full">
        <span>User_id</span>
        <input
          onChange={(e) => handleInputChange("user_id", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <div className="flex justify-between items-center gap-1 w-full">
        <span>Book_id</span>
        <input
          onChange={(e) => handleInputChange("book_id", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <div className="flex justify-between items-center gap-1 w-full">
        <span>Likes</span>
        <input
          onChange={(e) => handleInputChange("likes", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <div className="flex justify-between items-center gap-1 w-full">
        <span>Rating</span>
        <input
          onChange={(e) => handleInputChange("ratings", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <div className="flex justify-between items-center gap-1 w-full">
        <span>Clicks</span>
        <input
          onChange={(e) => handleInputChange("clicks", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <div className="flex justify-between items-center gap-1 w-full">
        <span>Orders</span>
        <input
          onChange={(e) => handleInputChange("orders", e.target.value)}
          className="w-1/2 border-gray-300 border rounded-sm p-1 px-2"
        />
      </div>
      <hr />
      <button
        onClick={sendData}
        className=" bg-blue-400 border border-blue-600 rounded-sm py-1 text-white font-medium"
      >
        Simulate Activity
      </button>

      <div className="flex ">
        {/* {latestRecom?.user_not_found == "true" && (
          <div>
            <p>
              You have no Interactions with our Ecommerce. Please Simulate an
              interaction to be ablke to se your recomendations
            </p>
          </div>
        )} */}
        {latestRecom?.books && latestRecom?.books.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <span className=" font-medium">
              Recomended Songs for user {data?.user_id}:
            </span>
            {latestRecom?.books.map((a: string) => (
              <span className=" text-center">{a}</span>
            ))}
          </div>
        ) : (
          <div>
            <p className=" text-center">
              You have no Interactions with our Ecommerce. Please Simulate an
              interaction to be ablke to se your recomendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mehdi;

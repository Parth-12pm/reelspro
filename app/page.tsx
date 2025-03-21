import { IVideo } from '../models/Video';
import { useEffect,useState } from "react";
import { apiclient } from "@/lib/api-client";

export default function Home() {

  const [videos, setvideos] = useState<IVideo[]>([]);


  useEffect(()=> {
    const fetchVideos = async () => {
      try {
    const data = await apiclient.getVideos()
    setvideos(data)
        
      } catch (error) {
        console.error("Erro fetching videos ", error)
      }
    }

    fetchVideos()
  }, [])



  return (
    <div>
      <h1>chai</h1>
    </div>

  );
}

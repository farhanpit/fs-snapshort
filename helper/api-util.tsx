
//import { MongoClient } from "mongodb";
import { connectDatabase, getAllGellerys } from "./db-utils";


export const getGallerys =async()=>{

const client=await connectDatabase()
  const db = client.db();

  const galleryCollection = db.collection('gallary');

  const dataInfo = await galleryCollection.find().toArray();
 const data= dataInfo.map((item) => ({
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    description:item.description,
    id: item._id.toString(),
  }))
  client.close();
  //console.log("data",data)
  return data

}



//    export  const getFeaturedEvents = async() => {
//      const allEvents=await getAllEvents()
 
//      return allEvents.filter((event) => event.isFeatured);
//    }
 
//      export async function getEventById(id:string) {
//          const allEvents=await getAllEvents()
//      return allEvents.find((event) => event.id === id);
//    }
  
//    export async function getFilteredEvents(dateFilter:any) {
//      const { year, month } = dateFilter;
//      const allEvents=await getAllEvents();
   
//      let filteredEvents = allEvents.filter((event) => {
//        const eventDate = new Date(event.date);
//        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
//      });
   
//      return filteredEvents;
//    }
 
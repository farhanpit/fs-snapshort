import { IGalleryList } from "@/helper/types/GalleryRecord";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Category from "../../helper/category";
import { CustomSearch } from "../../helper/customSearch";
import { Container } from "@mui/material";
import Head from "next/head";


function GalleryList(props: any) {
  const [gallaryItems, setGallaryItems] = useState(props.galleryItems);
  const [searchText, setSearchText] = useState<string>("");
  const search = CustomSearch(searchText);
  const [category, setCategory] = useState<string>("All");

  const searchItem = () => {
    const filteredItems = props.galleryItems?.filter((item: IGalleryList) => {
      const lowerCaseTitle = item.title.toLowerCase();
      const lowerCaseCategory = item.category.toLowerCase();
      const lowerCaseSearchText = search;
      if (category !== "All") {
        return (
          lowerCaseTitle.includes(lowerCaseSearchText) &&
          lowerCaseCategory.includes(category.toLowerCase())
        );
      } else {
        return lowerCaseTitle.includes(lowerCaseSearchText);
      }
    });
    setGallaryItems(filteredItems);
  };

  useEffect(() => {
    searchItem();
  }, [search, category]);


 

  const handletxtOnChange = (data: any) => {
    if (data !== "") {
      setSearchText(data);
    } else {
      setSearchText("");
      setGallaryItems(props.gallary);
    }
  };
 
  return (
    <div >
       <Head>
        <title>Gallery List</title>
        <meta
          name='description'
          content='This is a list of galleries showcasing beautiful images..'
        />
      </Head>
      <div className="searchFilter">
        <Container>
          <div className="formControlRow">
            <div className="formControlBlock">
              <span>Category </span>
              <select onChange={(e) => setCategory(e.target.value)} data-testid="cat-1">
                <option>All</option>
                {Category.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>{" "}
            </div>
            <div className="formControlBlock">
              <span>Search </span>
              <input
              name="search"
                type="text"
                value={searchText}
                onChange={(e) => {
                  handletxtOnChange(e.target.value);
                }}
              />{" "}
            </div>
          </div>
        </Container>
      </div>
      {gallaryItems?.length > 0 ? (
        <Container>
          <div className="galleryContent">
            {gallaryItems !== undefined &&
              gallaryItems.map((item: IGalleryList) => (
                <Card className="cardBlock" key={item.id} data-testid="cardBlock1">
                  <CardActionArea>
                    <div className="imgWrap" data-testid={item.id}>
                      <CardMedia
                        component="img"
                        height="140"
                        width="100"
                        image={item.imageUrl}
                        alt={item.title}
                        
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>             
              ))}
               
          </div>
        </Container>
      ) : (
        <Container> No Record found</Container>
      )}
    </div>
  );
}

export default GalleryList;

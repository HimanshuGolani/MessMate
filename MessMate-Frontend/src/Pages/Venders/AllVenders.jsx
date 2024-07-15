import { Container, Grid } from "@mui/material";
import VendorDisplayCard from "./VendorDisplayCard";
import { useEffect, useState } from "react";
import { useAppState } from "../../Context/AppState";
import axios from "axios";
import CircularIndeterminate from "../../../Component/CircularIndeterminate";

// The vendors will be displayed here..
export default function AllVenders() {
  const [vendors, setVendors] = useState([]);
  const { BASE_URL } = useAppState();
  const getAllVendors = async () => {
    const response = await axios.get(`${BASE_URL}/vender/getAllVendorDetails`);
    console.log("The plans asjh dskj", response.data);
    const { data } = response.data;
    setVendors(data);
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  return (
    <>
      <Container>
        <Grid container justifyContent="center" marginTop={"1rem"} spacing={2}>
          {vendors.length > 0 ? (
            <>
              {vendors.map((item, index) => (
                <VendorDisplayCard
                  businessName={item.businessName}
                  businessAddress={item.businessAddress}
                  ListOfPlansOffered={item.ListOfPlansOffered}
                  ListOfCustomers={item.ListOfCustomers}
                  businessPhone={item.businessPhone}
                  registeredOn={item.registeredOn}
                  imageOfMess={item.imageOfMess}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>
              <CircularIndeterminate />
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

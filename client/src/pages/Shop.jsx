import NavBar from "../components/NavBar"
import ProductsCard from "../components/ProductsCard"
import ProductAddtionnalInfos from "../components/ProductAdditionnalInfosSection"
import RelatedProductSection from "../components/RelatedProductSection"
import Footer from "../components/Footer"
export default function Shop(){
    return(
        <>
            <NavBar/>
            <ProductsCard/>
            <ProductAddtionnalInfos/>
            <RelatedProductSection />
            <Footer />
        </>
    )

}
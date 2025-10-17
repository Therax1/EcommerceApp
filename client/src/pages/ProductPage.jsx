import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import ProductAddtionnalInfos from "../components/ProductAdditionnalInfosSection"
import RelatedProductSection from "../components/RelatedProductSection"
import Footer from "../components/Footer"

export default function ProductPage(){
    return(
        <>
            <NavBar/>
            
            <ProductCard/>
            <ProductAddtionnalInfos/>
            <RelatedProductSection />
            <Footer />
        </>
    )

}
'use client'

import { FormatCusMd, Container, Footer, ModalEdit } from "@/app/components";
import {
  DegreeFreelancer,
  DescFreelancer,
  EducationFreelancer,
  FormatFreelancer,
  ProductFreelancer,
  ReviewFreelancer,
  SectionFreelancer
} from "@/app/components/freelancer";
import { useRouter } from "next/router";
import { freelancerList } from "@/app/constants";
import { useEffect, useState } from "react";
import FreelancerResponse from "@/models/freelancerResponse";
import FreelancerService from '../../../services/freelancerProfiles'
import CategoryService from '../../../services/category';
import CategoryResponse from "@/models/categoryResponse";
import { SkillItem } from "@/app/components/freelancer/DescFreelancer";

const DetailFreelancerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [freelancer, setFreelancer] = useState<FreelancerResponse>();
  const [categories, setCategories] = useState<CategoryResponse[]>([]); // Các category

  useEffect(() => {
    console.log("id: ", id);
    FreelancerService.getDetail(id)
      .then(freelancerDetailResponse => {
        console.log(freelancerDetailResponse)
        setFreelancer(freelancerDetailResponse)
      })
    CategoryService.get()
      .then(categoriesResponse => {
        setCategories(categoriesResponse.value);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const getCategories = (freelancer: FreelancerResponse): SkillItem[] => {
    const categoryIds = freelancer.Categories;
    return categoryIds.map(cId => ({
      title: `${categories.find(c => c.Id === cId)?.Name}`
    }))
  }

  // const ProductContent = (
  //   <ProductFreelancer product={product} />
  // )

  // const EducationContent = (
  //   <EducationFreelancer education={education} />
  // )

  // const DegreeContent = (
  //   <DegreeFreelancer degree={degree} />
  // )
  // Check
  if (!freelancer) {
    return <div>Not Data</div>;
  }

  const reviewContent = (
    <ReviewFreelancer
      src={freelancer.ImageUrl}
      title={freelancer.Title}
      // star={star}
      address={freelancer.Address}
      // country={country}
      price={freelancer.Price}
    // recommence={recommence}
    />
  )

  const bodyContent = (
    <>
      <DescFreelancer
        title={freelancer.Fullname}
        label={freelancer.Title}
        // star={star}
        // rateStar={rateStar}
        // numberCmt={numberComment}
        // performance={performance}
        detail={freelancer.Description}
        skill={getCategories(freelancer)}
      />

      {/* <SectionFreelancer
        title="Products"
        body={ProductContent}
      /> */}

      {/* <SectionFreelancer
        title="Education"
        body={EducationContent}
      />

      <SectionFreelancer
        title="Degree"
        body={DegreeContent}
      />  */}
    </>
  )

  return (
    <>
      <FormatCusMd>
        <Container>
          <FormatFreelancer
            review={reviewContent}
            body={bodyContent}
          />
        </Container>
      </FormatCusMd >
      <Footer />
    </>
  );
};

export default DetailFreelancerPage;

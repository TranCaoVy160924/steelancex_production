import "./globals.css"
import { Navbar, ClientOnly, Background, ModalEdit, QrMomo, ModalCreate, ModalPayment } from "./components"
import ToasterProvider from "./providers/ToasterProvider"
import { createContext, useContext, useEffect, useState } from "react"
import FreelancerResponse from "@/models/freelancerResponse"
import CategoryResponse from "@/models/categoryResponse"
import FreelancerService from '../services/freelancerProfiles'
import CategoryService from '../services/category'
import AuthService, { UserInfo } from '../services/auth'
import ContextValue from "@/models/contextValue"

// export const metadata = {
//   title: 'Steelancer',
//   description: 'Steelancer clone',
// }

export const MyContext = createContext<ContextValue>({
  currentUser: {
    Id: 0,
    Username: "",
    Email: "",
    Role: "",
    IsPremium: false
  },
  setCurrentUser: null
});

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentUser, setCurrentUser] = useState<UserInfo>({
    Id: 0,
    Username: "",
    Email: "",
    Role: "",
    IsPremium: false
  });
  const [, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [freelancerProfile, setFreelancerProfile] = useState<FreelancerResponse>({
    Id: 0,
    Title: "",
    Description: "",
    Categories: [],
    Price: 0,
    Fullname: "",
    ImageUrl: "",
    Address: ""
  });

  const getCategoriesStrings = (freelancer: FreelancerResponse): string[] => {
    const categoryIds = freelancer.Categories;
    return categoryIds.map(cId => `${categories.find(c => c.Id === cId)?.Name}`);
  }

  useEffect(() => {
    // FreelancerService.getDetail(id)
    //   .then(freelancerDetailResponse => {
    //     console.log(freelancerDetailResponse)
    //     setFreelancer(freelancerDetailResponse)
    //   })
    CategoryService.get()
      .then(categoriesResponse => {
        setCategories(categoriesResponse.value);
      })
      .catch(error => {
        console.log(error);
      })
    try {
      const userInfo = AuthService.getUserInfo();
      console.log(userInfo)
    } catch (error) {
      console.log(error)
    }
  }, [])

  type ModalEditData = Partial<typeof freelancerProfile>;

  const handleEditModalSubmit = (formData: ModalEditData = {}) => {
    console.log(formData);
    setShowEditModal(true);
  };

  return (
    <ClientOnly>
      <Background>
        <MyContext.Provider value={{
          currentUser,
          setCurrentUser
        }}>
          <ToasterProvider />
          <QrMomo />
          <ModalEdit
            onSave={handleEditModalSubmit}
            initialData={freelancerProfile}
            categories={getCategoriesStrings(freelancerProfile)}
          />
          <ModalCreate />
          <ModalPayment />
          <Navbar />
          {children}
        </MyContext.Provider>
      </Background>
    </ClientOnly>
  )
}

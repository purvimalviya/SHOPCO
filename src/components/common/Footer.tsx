import { Link } from "react-router-dom";
import RoundButton from "./RoundButton";
import T1 from "./T1";

const Footer = ()=>{
    interface FooterLink {
        name: string;
        url: string;
      }
      
    interface FooterSection {
        title: string;
        links: FooterLink[];
    }
    const footerLinks : FooterSection[] = [
        {
          title: 'Company',
          links: [
            { name: 'About', url: '/about' },
            { name: 'Features', url: '/features' },
            { name: 'Career', url: '/career' },
          ],
        },
        {
          title: 'Help',
          links: [
            { name: 'Customer Support', url: '/support' },
            { name: 'Terms & Conditions', url: '/terms' },
            { name: 'Privacy Policy', url: '/privacy' },
          ],
        },
        {
          title: 'FAQ',
          links: [
            { name: 'Account', url: '/account' },
            { name: 'Payments', url: '/payments' },
            { name: 'Orders', url: '/orders' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { name: 'Free Ebooks', url: '/ebooks' },
            { name: 'Youtube Playlist', url: '/playlist' },
            { name: 'How-to Blog', url: '/blog' },
          ],
        },
      ];

  return (
    <div className='flex  flex-col items-center bg-custom-gray mt-52'>

        <div className='flex justify-between items-center w-[86%] bg-black p-12 py-0 rounded-[2.5vw] mt-[-100px] mb-10 sm:flex-wrap sm:px-7 sm:rounded-[5vw] sm:pb-7'>
            <T1 align="left" className='text-white w-[40vw] mt-0 mb-0 sm:w-full'>STAY UP TO DATE ABOUT OUR LATEST OFFERS</T1>
            <div className='w-[20vw] flex flex-col gap-6 items-center justify-center sm:w-full'>
                <input type="text" className='w-full text-[1vw] rounded-full py-3 px-6 focus:outline-none sm:text-lg' placeholder="Enter your email address..."/>
                <RoundButton text="Subscribe to Newsletter" width="full" className='bg-white !text-black font-semibold'></RoundButton>
            </div>
        </div>

        <div className="flex flex-row gap-12 justify-between w-[86%] sm:flex-wrap sm:gap-4">
            <div className="flex flex-col gap-4 w-[20vw] sm:w-full sm:gap-0">
                <h1 className='text-3xl font-extrabold'>SHOP.CO</h1>
                <p className='text-gray-600 my-4'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>                
                <div className="flex flex-row gap-3">
                    <div>x</div>
                    <div>x</div>
                    <div>x</div>
                    <div>x</div>
                </div>
            </div>
            <div className="flex flew-row sm:flex-wrap justify-between w-full sm:gap-10">
              <div className="flex flew-row justify-around w-1/2 sm:w-full">
                {
                    footerLinks.slice(0, 2).map((_)=>{
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="font-medium">{_.title}</div>
                            {
                                _.links.map((x)=>{
                                    return (
                                        <div className='text-gray-600'><Link to={x.url}>{x.name}</Link></div>
                                    )
                                })
                            }

                            </div>
                        )
                    })
                }
              </div>

              <div className="flex flew-row justify-around w-1/2 sm:w-full">
              {
                    footerLinks.slice(2, 4).map((_)=>{
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="font-medium">{_.title}</div>
                            {
                                _.links.map((x)=>{
                                    return (
                                        <div className='text-gray-600'><Link to={x.url}>{x.name}</Link></div>
                                    )
                                })
                            }

                            </div>
                        )
                    })
                }
              </div>
            </div>
        </div>

        <div className={`w-[86%] bg-slate-300 h-[1px] my-6`}> </div> 

        <div className='text-gray-600 font-light text-sm mb-8 text-left w-[86%]'>Shop.co © 2000-2021, All rights reserved.</div>
    </div>
  )
}

export default Footer;


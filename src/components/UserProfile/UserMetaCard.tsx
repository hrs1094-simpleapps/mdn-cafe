import { userInfoStore } from "../../stores/userStore";

export default function UserMetaCard() {
  const { data } = userInfoStore(); 
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="flex items-center justify-center w-20 h-20 overflow-hidden border border-gray-200 rounded-full bg-brand-100">
              <h1 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                {data.name?.split("")[0]}
              </h1>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {data.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Admin/Owner
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manipal Dot Net
                </p>
              </div>
            </div>
            
          </div>
         
        </div>
      </div>
 
    </>
  );
}

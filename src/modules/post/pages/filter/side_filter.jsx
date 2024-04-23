import React from "react";
import Button from "../../../../shared/components/button";

const SideFilter = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item !rounded-[0px] border-t border-gray-200">
        <div className="collapse-title text-xs text-gray-800 font-medium items-center flex">
          محل
        </div>
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-content px-2 pl-5">
          <label
            className="input input-bordered flex items-center gap-2 bg-white border-gray-300 h-[40px]"
            onClick={() => document.getElementById("set_location").showModal()}
          >
            <input
              type="text"
              className="bg-white text-xs"
              placeholder="تعیین محل"
            />
          </label>
          <dialog id="set_location" className="modal">
            <div className="modal-box  bg-white">
              <h3 className="font-bold text-base text-gray-700">تعیین محل</h3>
              <p className="py-4 text-sm">حداقل یک محله انتخاب کنید.</p>
              <div className="w-full flex gap-3">
                <Button className="w-[100%]" styleVariant="secondary">
                  انصراف
                </Button>
                <Button className="w-[100%] !bg-[#2F80C0]">تایید</Button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item rounded-none border-t border-gray-200">
        <div className="collapse-title text-xs text-gray-800 font-medium items-center flex">
          قیمت
        </div>
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-content px-2 pl-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xs">حداقل</span>
            </div>
            <select
              className="select select-sm select-bordered bg-white border-gray-300"
              defaultValue={""}
            >
              <option value={""} disabled>
                مثلا ۷۰،۰۰۰،۰۰۰
              </option>
              <option value={"11"} key={"11"}>
                ۲۰۰ هزار{" "}
              </option>
              <option value={"12"} key={"12"}>
                ۵۰۰ هزار{" "}
              </option>
              <option value={"13"} key={"13"}>
                ۲ میلیون{" "}
              </option>
              <option value={"14"} key={"14"}>
                ۵ میلیون{" "}
              </option>
              <option value={"15"} key={"15"}>
                ۱۰ میلیون{" "}
              </option>
              <option value={"16"} key={"16"}>
                ۵۰ میلیون{" "}
              </option>
              <option value={"17"} key={"17"}>
                ۲۰۰ میلیون{" "}
              </option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs py-4">
            <div className="label">
              <span className="label-text text-xs">حداکثر</span>
            </div>
            <select
              className="select select-sm select-bordered bg-white border-gray-300"
              defaultValue={""}
            >
              <option value={"10"} disabled>
                مثلا ۷۰،۰۰۰،۰۰۰
              </option>
              <option value={"11"} key={"11"}>
                ۲۰۰ هزار{" "}
              </option>
              <option value={"12"} key={"12"}>
                ۵۰۰ هزار{" "}
              </option>
              <option value={"13"} key={"13"}>
                ۲ میلیون{" "}
              </option>
              <option value={"14"} key={"14"}>
                ۵ میلیون{" "}
              </option>
              <option value={"15"} key={"15"}>
                ۱۰ میلیون{" "}
              </option>
              <option value={"16"} key={"16"}>
                ۵۰ میلیون{" "}
              </option>
              <option value={"17"} key={"17"}>
                ۲۰۰ میلیون{" "}
              </option>
            </select>
          </label>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item rounded-none border-t border-gray-200">
        <div className="collapse-title text-xs text-gray-800 font-medium items-center flex">
          وضعیت آگهی
        </div>
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-content px-2 pl-5">
          <div className="flex flex-col">
            <div className="form-control w-full">
              <label className="cursor-pointer label">
                <span className="label-text">فقط عکس دار</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm bg-white hover:bg-white  [--tglbg:#c0c0c0] checked:[--tglbg:#2F80C0] border-none"
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="cursor-pointer label">
                <span className="label-text">فقط فور</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm bg-white hover:bg-white [--tglbg:#c0c0c0] checked:[--tglbg:#2F80C0] border-none"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;

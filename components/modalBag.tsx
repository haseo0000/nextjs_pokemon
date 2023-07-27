import React from "react";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { HiMinusCircle } from "react-icons/hi";
import { RootState } from "@/redux/store";
import { decrementBag } from "@/redux/bag";

export default function ModalBag({ openModal, closeModal }: any) {
  const { bag } = useSelector((state: RootState) => state.bag);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => closeModal(false)}
        center
        classNames={{ modal: "customModal" }}>
        <div
          className="mt-5 px-5 overflow-y-auto"
          style={{ maxHeight: "500px" }}>
          <p className="text-2xl font-bold text-center">Your Bag</p>
          <div className="grid gap-5 mt-5 pb-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {bag.map((item: any) => (
              <div
                key={item.name}
                className="relative text-center rounded-md bg-white">
                <img src={item.image} alt={item.image} width={100} />
                <p>{item.name}</p>
                <button
                  className="absolute -top-1 right-0 rounded-full p-0.1 bg-red-500"
                  onClick={() => dispatch(decrementBag({ pokemon: item }))}>
                  <span className="text-white text-2xl">
                    <HiMinusCircle />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

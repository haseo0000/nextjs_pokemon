import React from "react";
// import { Modal } from "react-responsive-modal";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { HiMinusCircle } from "react-icons/hi";
import { RootState } from "@/redux/store";
import { decrementBag } from "@/redux/bag";

export default function ModalBag({ openModal, closeModal }: any) {
  const { bag } = useSelector((state: RootState) => state.bag);
  const dispatch = useDispatch();

  const style: any = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#b2dbbf",
    border: "2px solid #000",
    padding: "1rem",
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => closeModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div style={style}>
          <p className="text-3xl font-bold text-center">Bag</p>
          {bag.length < 1 ? (
            <div className="mt-5 text-xl">Your bag is empty.</div>
          ) : (
            <div
              style={{ maxHeight: "400px", overflow: "auto" }}
              className="grid gap-5 mt-5 grid-cols-2 p-1 sm:p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {bag.map((item: any) => (
                <div
                  key={item.name}
                  className="relative text-center rounded-md bg-white ">
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
          )}
        </div>
      </Modal>
    </>
  );
}

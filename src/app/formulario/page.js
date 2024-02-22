"use client";

import { useDynamicInputs } from "@/services/dynamic-inputs-api";
import DynamicInput from "@/components/dynamic-input";
import { useRef } from "react";
import Navbar from "@/components/navbar";

export default function Formulario() {
  const { data, error, isLoading } = useDynamicInputs();
  const form = useRef(null);

  const handleSubmit = (e) => {
    if (!form.current.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const formData = new FormData(form.current);
      formData.forEach((value, name) => console.log({ name, value }));
    }

    form.current.classList.add("was-validated");
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1 className="text-center pt-2 pb-2">Dynamic inputs</h1>

        {isLoading && (
          <div className="position-absolute top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary"></div>
          </div>
        )}
        {error && (
          <div className="position-absolute top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="text-danger">Error retrieving data</div>
          </div>
        )}
        {data && (
          <form ref={form} noValidate>
            {data.items.map((item) => (
              <DynamicInput key={item.id} item={item} />
            ))}
            <div className="row justify-content-center">
              <div className="col-auto">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
}

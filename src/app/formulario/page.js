"use client";

import { useDynamicInputs } from "@/services/dynamic-inputs-api";
import DynamicInput from "@/components/dynamic-input";
import { useRef } from "react";

export default function Formulario() {
  const { data, isLoading } = useDynamicInputs();
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
    <main className="container">
      <h1 className="text-center p-3">Dynamic inputs</h1>

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
  );
}

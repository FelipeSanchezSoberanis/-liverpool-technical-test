export default function DynamicInput({ item }) {
  switch (item.type.trim().toLowerCase()) {
    case "boolean":
      return (
        <div key={item.id} className="row mb-3 g-0 justify-content-center">
          <div className="col-12 col-md-5 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={item.id}
              name={item.name}
              defaultValue={item.defaultValue}
              required={item.mandatory}
            />
            <label className="form-check-label">{item.description}</label>
          </div>
        </div>
      );
    case "text_area":
      return (
        <div key={item.id} className="row mb-3 g-0 justify-content-center">
          <div className="col-12 col-md-5">
            <label className="form-label">{item.description}</label>
            <textarea
              className="form-control"
              id={item.id}
              name={item.name}
              defaultValue={item.defaultValue}
              required={item.mandatory}
            />
          </div>
        </div>
      );
    case "multiple_values_list":
      return (
        <div key={item.id} className="row mb-3 g-0 justify-content-center">
          <div className="col-12 col-md-5">
            <label className="form-label">{item.description}</label>
            <select
              className="form-select"
              id={item.id}
              name={item.name}
              required={item.mandatory}
              defaultValue={item.defaultValue}
            >
              {[item.defaultValue, ...item.acceptedValues].map((acceptedValue) => (
                <option key={acceptedValue} value={acceptedValue}>
                  {acceptedValue}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    case "text":
      return (
        <div key={item.id} className="row mb-3 g-0 justify-content-center">
          <div className="col-12 col-md-5">
            <label className="form-label">{item.description}</label>
            <input
              type="text"
              className="form-control"
              id={item.id}
              name={item.name}
              defaultValue={item.defaultValue}
              required={item.mandatory}
            />
          </div>
        </div>
      );
    case "radio":
      return (
        <div key={item.id} className="row mb-3 g-0 justify-content-center">
          <div className="col-12 col-md-5">
            <label className="form-label">{item.description}</label>
            {item.acceptedValues.map((acceptedValue) => (
              <div key={acceptedValue} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={item.name}
                  id={item.id}
                  value={acceptedValue}
                  defaultChecked={acceptedValue === item.defaultValue}
                  required={item.mandatory}
                />
                <label className="form-check-label">{acceptedValue}</label>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

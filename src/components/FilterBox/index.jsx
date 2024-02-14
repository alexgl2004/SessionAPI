import styles from "./FilterBox.module.css";

// FilterBox Props:
// boxStyle: "linklist" or "select"
// data: [{key:"gryffindor", value:"Gryffindor"}]
// onFilterChange: (key)=>{}

export function FilterBox({ boxStyle, data, onFilterChange }) {
  if (boxStyle === "linklist") {
    return (
      <div className={styles["filter-box"]}>
        <button
          onClick={() => {
            onFilterChange(null);
          }}
        >
          ALL
        </button>
        {data.map(({ key, value }) => {
          return (
            <button
              key={key}
              onClick={() => {
                onFilterChange(key);
              }}
            >
              {value}
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <select
        name="select_names"
        className="search_help_buttons"
        onChange={(event) =>
          onFilterChange(
            event.target.value === "ALL" ? null : event.target.value
          )
        }
      >
        <option value={"ALL"}>ALL</option>
        {data.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    );
  }
}

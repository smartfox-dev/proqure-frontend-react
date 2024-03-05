import "./Description.css";

const Description = (props) => {
  return (
    <div className="product__description__product">
      <div className="description__header__container">
        <div className="description__header">Description</div>
      </div>
      <div className="description__detail__container">
        <div className="description__detail">
          <span className="description__detail__p">{props.item.details}</span>
        </div>
      </div>
      <div className="description__specifics__container">
        <div className="description__specifics">
          <div className="description__header__line"></div>
          <div className="description__highlights__header">
            Key Product Details
          </div>
          <div className="description__highlights__content">
            <ul className="custom-list">
              {/* Existing or additional <li> elements */}
              <li key={1}>
                WHOLE GRAIN GOODNESS: Teff Flour is a pleasingly light, uniquely
                flavored, 100% whole grain flour
              </li>
              <li key={2}>GLUTEN FREE</li>
              <li key={3}>GOOD SOURCE OF IRON</li>
              <li key={4}>NON-GMO:</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

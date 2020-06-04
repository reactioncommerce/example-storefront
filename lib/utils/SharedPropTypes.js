import PropTypes from "prop-types";

export default {
  tag: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    displayTitle: PropTypes.string,
    heroMediaUrl: PropTypes.string,
    isTopLevel: PropTypes.bool,
    name: PropTypes.string.isRequired,
    position: PropTypes.number,
    slug: PropTypes.string.isRequired,
    subTagIds: PropTypes.arrayOf(PropTypes.string)
  })
};

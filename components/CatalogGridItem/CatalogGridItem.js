import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme, CustomPropTypes } from "@reactioncommerce/components/utils";
import { priceByCurrencyCode } from "@reactioncommerce/components/CatalogGridItem/v1/utils";
import Link from "components/Link";

const ProductMediaWrapper = styled.div`
  background-color: ${applyTheme("CatalogGridItem.mediaBackgroundColor")};
  position: relative;
`;

const ProductInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: ${applyTheme("CatalogGridItem.verticalSpacingBetweenImageAndInfo")};
`;

const ProductTitle = styled.aside`
  ${addTypographyStyles("CatalogGridItemProductTitle", "headingTextBold")}
  line-height: 1.125;
`;

const ProductVendor = styled.span`
  ${addTypographyStyles("CatalogGridItemProductVendor", "labelText")}
`;

const PriceContainer = styled.div`
  text-align: right;
`;

class CatalogGridItem extends Component {
  static propTypes = {
    /**
     * Labels to use for the various badges. Refer to `BadgeOverlay`'s prop documentation.
     */
    badgeLabels: PropTypes.shape({
      BACKORDER: PropTypes.string,
      BESTSELLER: PropTypes.string,
      LOW_QUANTITY: PropTypes.string,
      SOLD_OUT: PropTypes.string,
      SALE: PropTypes.string
    }),
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      BadgeOverlay: CustomPropTypes.component.isRequired,
      Link: CustomPropTypes.component.isRequired,
      Price: CustomPropTypes.component.isRequired,
      ProgressiveImage: CustomPropTypes.component.isRequired
    }),
    /**
     * Currency code to display the price for. Product must include a pricing object with the code in `product.pricing`
     */
    currencyCode: PropTypes.string.isRequired,
    /**
     * Item click handler
     */
    onClick: PropTypes.func,
    /**
     * Image to display when product doesn't have a primary image
     */
    placeholderImageURL: PropTypes.string,
    /**
     * Product to display
     */
    product: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      vendor: PropTypes.string,
      primaryImage: PropTypes.shape({
        URLs: PropTypes.shape({
          large: PropTypes.string,
          medium: PropTypes.string,
          small: PropTypes.string,
          thumbnail: PropTypes.string
        })
      }),
      pricing: PropTypes.arrayOf(PropTypes.shape({
        currency: PropTypes.shape({
          code: PropTypes.string
        }),
        displayPrice: PropTypes.string
      })),
      isSoldOut: PropTypes.bool,
      isBackorder: PropTypes.bool,
      isOnSale: PropTypes.bool,
      isLowQuantity: PropTypes.bool,
      isBestseller: PropTypes.bool
    })
  };

  static defaultProps = {
    badgeLabels: null,
    onClick() {},
    placeholderImageURL: ""
  };

  state = {
    fit: "cover"
  };

  componentDidMount() {
    this._mounted = true;

    this.setImageFit();
  }

  componentDidUpdate() {
    this.setImageFit();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  setImageFit = () => {
    // Use cover fit if image is landcape, contain if portrait
    if (typeof Image !== "undefined") {
      const { large } = this.primaryImage.URLs;
      const largeImage = new Image();
      largeImage.src = large;
      largeImage.onload = () => {
        if (this._mounted === false) {
          return;
        }

        let fit = "";
        const { width, height } = largeImage;
        if (height > width) {
          // Image is portrait
          fit = "contain";
        } else {
          // Image is landscape
          fit = "cover";
        }

        if (fit !== this.state.fit) {
          this.setState({ fit });
        }
      };
    }
  };

  get primaryImage() {
    const { product: { primaryImage }, placeholderImageURL } = this.props;
    if (!primaryImage) {
      return {
        URLs: {
          thumbnail: placeholderImageURL,
          small: placeholderImageURL,
          medium: placeholderImageURL,
          large: placeholderImageURL
        }
      };
    }
    return primaryImage;
  }

  renderProductMedia() {
    const { components: { ProgressiveImage }, product: { description } } = this.props;
    const { fit } = this.state;

    return (
      <ProductMediaWrapper>
        <ProgressiveImage
          fit={fit}
          altText={description}
          presrc={this.primaryImage.URLs.thumbnail}
          srcs={this.primaryImage.URLs}
        />
      </ProductMediaWrapper>
    );
  }

  renderProductInfo() {
    const {
      components: { Price },
      currencyCode,
      product: { pricing, title, vendor }
    } = this.props;
    const productPrice = priceByCurrencyCode(currencyCode, pricing) || {};

    return (
      <div>
        <ProductInfo>
          <ProductTitle>{title}</ProductTitle>
          <PriceContainer>
            <Price displayPrice={productPrice.displayPrice} />
          </PriceContainer>
        </ProductInfo>
        <div>
          <ProductVendor>{vendor}</ProductVendor>
        </div>
      </div>
    );
  }

  render() {
    const { className, badgeLabels, components: { BadgeOverlay }, product } = this.props;

    const { slug } = product;
    const badgeProps = { product };

    if (badgeLabels) {
      badgeProps.badgeLabels = badgeLabels;
    }

    return (
      <div className={className}>
        <Link
          href="/product/[...slugOrId]"
          as={`/product/${slug}`}
        >
          <BadgeOverlay {...badgeProps}>
            {this.renderProductMedia()}
            {this.renderProductInfo()}
          </BadgeOverlay>
        </Link>
      </div>
    );
  }
}

export default withComponents(CatalogGridItem);

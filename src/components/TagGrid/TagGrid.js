import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "components/Link";

const styles = (theme) => ({
  title: {
    marginBottom: theme.spacing.unit
  },
  chip: {
    cursor: "pointer"
  }
});

/**
 * Tag grid - displays a grid of tags
 */
@withStyles(styles, { withTheme: true, name: "SkTagGrid" })
export default class TagGrid extends Component {
  static propTypes = {
    /**
     * CSS class names
     */
    classes: PropTypes.object,

    /**
     * Array of tag nodes
     */
    tags: PropTypes.array,

    /**
     * Theme
     */
    theme: PropTypes.object
  }

  render() {
    const {
      classes,
      tags,
      theme
    } = this.props;

    if (!Array.isArray(tags)) return null;

    return (
      <section>
        <Typography className={classes.title} variant="title">{"Tags"}</Typography>
        <Grid container spacing={theme.spacing.unit}>
          {tags.map((tag) => (
            <Grid item key={tag.slug}>
              <Link route={`/tag/${tag.slug}`}>
                <Chip className={classes.chip} label={tag.name} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
    );
  }
}

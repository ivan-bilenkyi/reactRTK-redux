import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
// import { comments } from "../../helpers/comments";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/filterSlice";
import { useGetCommentsQuery } from "../../redux/commentApi";

export const Comments = () => {
  const filter = useSelector(selectFilter);

  const {data: comments, isLoading, isError} = useGetCommentsQuery()

  const visibleComments = () => {
    return comments.filter(({ content }) =>
      content.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Grid>
      {isLoading && <p>...LOADING</p>}
      {isError && <p>ERROR</p>}
      {comments &&
        visibleComments().map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};

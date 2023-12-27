import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';
import { useUpdateCommentCountMutation } from '../../redux/commentApi';

export const Button = ({ children, counter, role = 'thumbsUp', id }) => {
  const variants = {
    [styles.thumbsUp]: role === 'thumbsUp',
    [styles.thumbsDown]: role === 'thumbsDown',
  };

  const [updateCommentCount, {isLoading}] = useUpdateCommentCountMutation();

  const onBtnHandleClick = async() => {

    // switch (role) {
    //   case "thumbsUp":
    //     updateCommentCount({id, thumbsUp: counter + 1})
    //     break;
    //   case "thumbsDown":
    //     updateCommentCount({id, thumbsDown: counter + 1})
    //     break;
    
    //   default:
    //     break;
    // }
try {
  await updateCommentCount({
      id, [role]: counter + 1,
    })
} catch (error) {
  console.log(error.message);
}

  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type='button'
      counter={counter}
      onClick={onBtnHandleClick}
      id={id}
    >
      {children}

      <span className={styles.counter}>
        <span>{ isLoading && "..."}</span>
        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};

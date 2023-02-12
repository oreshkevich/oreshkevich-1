import ivanImg from '../../assets/img/ivan.png';
import star from '../../assets/svg/star-1.svg';
import starNotPainted from '../../assets/svg/star-2.svg';

import './comments.scss';

function Comments(props) {
  const { createdAt, text, user } = props;

  const serverDate = new Date(createdAt);
  const dataMonth = serverDate.toDateString();

  return (
    <div>
      <div
        className='book-list__wrap-feedback book-list__wrap-feedback_padding
            '
      >
        <div className='book-list__feedback-item book-list__feedback-item_padding'>
          {user.avatarUrl ? (
            <img src={`https://strapi.cleverland.by${user.avatarUrl}`} alt='Ivan' />
          ) : (
            <img src={ivanImg} alt='Ivan' />
          )}
          <div className='book-list__feedback-elem'>
            <p className='book-list__feedback-text'>
              {user.firstName} {user.lastName}
            </p>
            <p className='book-list__feedback-text'>{dataMonth}</p>
          </div>
        </div>
        <div className='book-list__star-wrap book-list__star-wrap_padding'>
          <img src={star} alt='star-1' />
          <img src={star} alt='star-1' />
          <img src={star} alt='star-1' />
          <img src={star} alt='star-1' />
          <img src={starNotPainted} alt='star-1' />
        </div>
      </div>
      <p className='book-list__text'>{text}</p>
    </div>
  );
}

export { Comments };

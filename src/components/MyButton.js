const MyButton = ({text, type, onClick}) => {

  const btnType = ['positive', 'nagative'].includes(type) ? type: 'defalut';

  return (
    <button 
      className={['MyButton', `MyButton_${btnType}`].join(' ')} onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: 'default',
}

export default MyButton;
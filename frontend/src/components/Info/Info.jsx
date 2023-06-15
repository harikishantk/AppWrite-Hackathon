import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Card from '../Card/Card.jsx';

const Info = ({data, notfound}) => {
  console.log(data, notfound);
  return (
    <div className="flex flex-row">
      <div className='basis-3/4'>
        <div className="m-20 mr-200 p-10 border-2 border-black rounded-lg ">
          {notfound ? <center><h1>Company overview</h1></center> : null}
          {/* There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. */}
          {data}
        </div>
      </div>
    </div>
  );
};

export default Info;

import { useState, useRef, useEffect } from 'react';

function Input() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Set focus on the first input when the component mounts
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, e) => {
    const newOtp = [...otp];
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Allow only numeric input
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < inputRefs.current.length - 1) { // Move focus to next input
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '' && index > 0) { // Delete input and move focus to previous input
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    if (e.key === 'ArrowLeft' && index > 0) { // Move focus to previous input on left arrow key
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < inputRefs.current.length - 1) { // Move focus to next input on right arrow key
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData)) { // Auto-fill input fields on valid OTP paste
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
    }
    e.preventDefault();
  };

  const handleVerifyClick = () => {
    const enteredOtp = otp.join('');
    if (/^\d{6}$/.test(enteredOtp)) {
      // Verify OTP
      alert('you otp is correct');
    } else {
      // Show error message
      alert('your otp is not correct')
    }
  };

  return (
    <div className="popup">
      <h3>Phone Verification</h3>
      <p style={{
        fontFamily:"cursive"
      }}>Enter the 6 digit OTP sent to your phone number</p>
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            value={digit}
            maxLength={1}
            pattern="[0-9]"
            inputMode="numeric"
            onChange={e => handleInputChange(index, e)}
            onKeyDown={e => handleInputKeyDown(index, e)}
            onPaste={handlePaste}
            //add css here only
            style={{
                border:"none",
                outline:"none",
                borderBottom:"1px solid black",
                marginLeft:"5px",
                width:"20px",
                fontFamily:"cursive"
            }}
          />
        ))}
      </div>
      <button className="verify-btn"
      
      onClick={handleVerifyClick}
      style={{
        background:"blue",
        color:"white",
        width:"100px",
        height:"50px",
        margin:"20px",
        borderRadius:"10%",
        fontSize:"18px"
      }}
      >Verify</button>
    </div>
  );
}

export default Input;

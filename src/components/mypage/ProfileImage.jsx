import React from 'react';
import Button from '../common/Button';
import { useRef } from 'react';

const ProfileImage = ({ imageUrl, handleImageChange }) => {
  const fileInputRef = useRef(null);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        type="button"
        variant="primary"
        size="medium"
        onClick={() => fileInputRef.current.click()}
      >
        이미지 선택
      </Button>

      <input
        ref={fileInputRef}
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <img
        src={imageUrl || '/profile_default.png'}
        alt="프로필 이미지"
        className="object-cover w-[130px] h-[130px] bg-light-gray rounded-full"
      />
    </div>
  );
};

export default ProfileImage;

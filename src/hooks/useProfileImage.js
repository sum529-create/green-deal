import { supabase } from '../api/client';
import {
  ALLOWED_IMAGE_TYPES,
  BUCKET_NAME,
  MAX_FILE_SIZE,
  PRODUCT_DEFAULT_IMG,
  PROFILES_DIRECTORY,
} from '../constants/mypageConstants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProfileImage = (userdata) => {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: async (file) => {
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${file.name.split('.').pop()}`;
      const filePath = `${PROFILES_DIRECTORY}/${fileName}`;

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { upsert: false });

      if (error) throw error;

      const { data: urlData } = await supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    },
  });

  const updateProfileImageMutation = useMutation({
    mutationFn: async (imageUrl) => {
      const { error } = await supabase
        .from('users')
        .update({ profile_img: imageUrl })
        .eq('user_id', userdata.user_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userdata?.user_id]);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('2MB 이하의 파일을 선택해주세요.');
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
    }

    uploadImageMutation.mutate(file, {
      onSuccess: (imageUrl) => {
        updateProfileImageMutation.mutate(imageUrl);
      },
    });
  };

  return {
    imageUrl: userdata?.profile_img || PRODUCT_DEFAULT_IMG,
    handleImageChange,
  };
};

export default useProfileImage;

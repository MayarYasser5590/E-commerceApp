export const API_ENDPOINTS = {
  AUTH: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    changePassword: '/auth/change-password',
    uploadPhoto: '/auth/upload-photo',
    getUserData: '/auth/profile-data',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgotPassword',
    verifyReset: '/auth/verifyResetCode',
    resetPassword: '/auth/resetPassword',
    deleteAccount: '/auth/deleteMe',
    editProfile: '/auth/editProfile',
    changeRole: '/auth/update-role',
  },
  PRODUCTS: {
    // Add product related endpoints here later
    list: '/products',
  },
} as const;

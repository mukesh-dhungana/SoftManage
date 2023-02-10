export const emailRegexValidaion = (email: string) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const phoneNumberRegexValidation = (phone: string) => {
  var re = /^((\\+)|(00)|(\\*)|())[0-9]{10,14}((\\#)|())$/;
  return re.test(phone);
};

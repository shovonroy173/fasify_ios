export function getBusinessType(user) {
  if (user.isAttraction) return true;
  if (user.isCar) return true;
  if (user.isHotel) return true;
  if (user.isSecurity) return true;
  return false;
}


export function getBusinessTypeName(user) {
  if (user.isAttraction) return 'attractions';
  if (user.isCar) return 'car';
  if (user.isHotel) return 'hotel';
  if (user.isSecurity) return 'security';
  return false;
}
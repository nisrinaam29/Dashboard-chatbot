const generalResponse = (
  status: number,
  success?: boolean,
  message?: string | any,
  data?: any | null
) => {
  return Response.json(
    {
      status,
      success,
      message,
      data,
    },
    { status }
  );
};

export default generalResponse;

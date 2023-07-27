import React from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string };
};

function page({ params }: Props) {
  return <div>page {JSON.stringify(params.slug)}</div>;
}

export default page;

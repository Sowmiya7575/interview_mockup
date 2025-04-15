import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import { getInterviewById } from '@/lib/actions/general.action' 
import { getRandomInterviewCover } from '@/lib/utils'
import Image from 'next/image';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import Agent from '@/components/Agent';

import { getCurrentUser } from '@/lib/actions/auth.action';


const page = async({params}:RouteParams) => {
    const{id} =  await params;
    const user = await getCurrentUser();
    const interview = await getInterviewById(id);

    if (!interview) return redirect('/');

  return (
    <>
    <div className='flex flex-col gap-4 justify-between'>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
            <div className='flex flex-row gap-4 items-center'>
                <Image src={getRandomInterviewCover()} alt="cover Image" width={40} height={40} className="rounded-full object-fit size-[40px]" />
                <h3 className='capitalize'>{interview.role} Interview</h3>
                <DisplayTechIcons techStack={interview.techstack} />
            </div>
            <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
        </div>
        <Agent userName={user?.name} type={user?.id} interviewId={id} type="interview" questions={interview.questions}/>       
    </div>
    </>
  )
}

export default page

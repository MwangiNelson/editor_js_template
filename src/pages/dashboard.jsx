import React, { useContext, useState, useRef } from 'react'
import { AuthContext } from '../contexts/AppContexts'

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Paragraph from '@editorjs/paragraph';


function Dashboard() {

    const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorJs',
        tools: {
            header: {
                class: Header,
                config: {
                    placeholder: 'Enter a header',
                    levels: [1, 2, 3, 4],
                    defaultLevel: 3,
                    inlineToolbar: true
                }
            },
            list: List,
            image: SimpleImage,
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
            },
        },
    });

    const [images, setImages] = useState([])
    const projectNameRef = useRef()
    const requiredAmountRef = useRef()
    const [projectDescription, setProjectDescription] = useState(null)
    const projectCaptionRef = useRef()


    const { user } = useContext(AuthContext)
    // console.log(user)


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageUrls]);
    };

    const handleDeleteImage = (imageUrl) => {
        setImages(prevImages => prevImages.filter(image => image !== imageUrl));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
            setProjectDescription(outputData)
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });


        let data = {
            images: images,
            projectName: projectNameRef.current.value,
            requiredAmount: requiredAmountRef.current.value,
            projectCaption: projectCaptionRef.current.value,
            projectDescription: projectDescription
        }


    }

    return (
        <div className="flex flex-col justify-center items-center">

            <img src="/logo.png" alt="" className='pt-7' />
            <form onSubmit={handleSubmit} className="w-3/4 bg-cream mx-auto my-8 p-4 py-10 shadow-lg rounded-lg">
                <h3 className='text-5xl font-bold text-gray-700 pb-4'>Add A New Project</h3>
                <div className="flex flex-row w-full gap-4">
                    <div className="mb-4 w-full">
                        <label htmlFor="project_title" className="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
                        <input type="text" ref={projectNameRef} id="project_caption" name="project_caption" required className="appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="project_required_donations" className="block text-gray-700 text-sm font-bold mb-2">Required Donations</label>
                        <div className="appearance-none bg-white border ps-4 rounded w-full  focus:shadow-outline flex flex-row justify-center items-center">
                            KES
                            <input type="number" ref={requiredAmountRef} id="project_title" name="project_title" required className="py-2 px-3 w-full rounded ring-0 text-gray-700 bg-white leading-tight focus:outline-none" />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="project_description" className="block text-gray-700 text-sm font-bold mb-2">Project Description</label>
                    <div id="editorJs" className='bg-white p-4 rounded shadow'></div>
                    <p className="text-gray-600 text-xs italic">Add a detailed description of the project here</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="project_caption" className="block text-gray-700 text-sm font-bold mb-2">Project Caption</label>
                    <textarea name="" ref={projectCaptionRef} className='appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' id="" rows="2"></textarea>
                    <p className="text-gray-600 text-xs italic">Add a simple caption for this project to be displayed on the featured section.</p>

                </div>

                <div className="mb-6">
                    <label htmlFor="project_photos" className="block text-gray-700 text-sm font-bold mb-2">Project Photos</label>
                    <input type="file" accept='image/*' id="project_photos" name="project_photos" multiple required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleImageChange} />
                    <p className="text-gray-600 text-xs italic">Upload at least one photo.</p>
                    <p className="text-gray-600 text-xs italic">The first photo will be used as the banner image.</p>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img className="h-full object-cover max-w-full rounded-lg" src={image} alt="" />
                            <button className="absolute top-0 shadow-lg hover:bg-red-400 m-4 right-0 bg-red-600 text-white p-1 rounded-full" onClick={() => handleDeleteImage(image)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}
export default Dashboard
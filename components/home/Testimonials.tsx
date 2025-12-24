'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: '1',
    name: 'Sadia Islam',
    nameBn: 'সাদিয়া ইসলাম',
    role: 'HSC Student',
    roleBn: 'এইচএসসি শিক্ষার্থী',
    content: 'The Champions helped me achieve my dream of getting into my desired university. The teachers are incredibly supportive and the course materials are excellent.',
    contentBn: 'দ্য চ্যাম্পিয়ন্স আমাকে আমার পছন্দের বিশ্ববিদ্যালয়ে ভর্তি হওয়ার স্বপ্ন পূরণ করতে সাহায্য করেছে। শিক্ষকরা অত্যন্ত সহায়ক এবং কোর্স উপকরণগুলি চমৎকার।',
    rating: 5,
    image: '/images/student-1.jpg',
  },
  {
    id: '2',
    name: 'Rakib Hasan',
    nameBn: 'রাকিব হাসান',
    role: 'SSC Student',
    roleBn: 'এসএসসি শিক্ষার্থী',
    content: 'Best coaching center I have ever been to. The flexible schedule allowed me to balance my studies with other activities perfectly.',
    contentBn: 'আমি যেখানে গিয়েছি সেখানে সেরা কোচিং সেন্টার। নমনীয় সময়সূচী আমাকে আমার পড়াশোনা অন্যান্য ক্রিয়াকলাপের সাথে নিখুঁতভাবে ভারসাম্য রাখতে দিয়েছে।',
    rating: 5,
    image: '/images/student-2.jpg',
  },
  {
    id: '3',
    name: 'Tasnim Ahmed',
    nameBn: 'তাসনিম আহমেদ',
    role: 'University Admission Test',
    roleBn: 'বিশ্ববিদ্যালয় ভর্তি পরীক্ষা',
    content: 'The admission test preparation course was outstanding. I secured admission to my first choice university thanks to the comprehensive guidance.',
    contentBn: 'ভর্তি পরীক্ষার প্রস্তুতির কোর্সটি অসাধারণ ছিল। ব্যাপক নির্দেশনার জন্য আমি আমার প্রথম পছন্দের বিশ্ববিদ্যালয়ে ভর্তি নিশ্চিত করতে পেরেছি।',
    rating: 5,
    image: '/images/student-3.jpg',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Real stories from students who achieved their goals with us
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg h-full"
              >
                <Quote className="w-12 h-12 text-primary-200 mb-4" />
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}


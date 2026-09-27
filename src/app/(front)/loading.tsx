export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col pt-24 pb-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        {/* Skeleton Hero / Header */}
        <section className="relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 animate-pulse">
          <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-4 md:space-y-6 w-full">
              {/* Badge */}
              <div className="h-6 w-32 bg-white/10 rounded-full mx-auto md:mx-0"></div>
              {/* Title */}
              <div className="space-y-3">
                <div className="h-10 sm:h-14 bg-white/10 rounded-xl w-3/4 mx-auto md:mx-0"></div>
                <div className="h-10 sm:h-14 bg-white/10 rounded-xl w-1/2 mx-auto md:mx-0"></div>
              </div>
              {/* Description */}
              <div className="h-4 bg-white/5 rounded-md w-full max-w-md mx-auto md:mx-0"></div>
              <div className="h-4 bg-white/5 rounded-md w-5/6 max-w-md mx-auto md:mx-0"></div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
                <div className="h-12 w-full sm:w-40 bg-white/10 rounded-xl"></div>
                <div className="h-12 w-full sm:w-40 bg-white/10 rounded-xl"></div>
              </div>
            </div>
            
            {/* Right Image/Banner Mock */}
            <div className="flex-1 w-full aspect-video md:aspect-auto md:h-80 bg-white/5 rounded-2xl"></div>
          </div>
        </section>

        {/* Skeleton Grid (Games/Articles representation) */}
        <section className="animate-pulse">
          <div className="h-8 w-48 bg-white/10 rounded-lg mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden aspect-[3/4] flex flex-col relative">
                {/* Image Placeholder */}
                <div className="w-full h-full bg-white/5"></div>
                
                {/* Content Placeholder */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Second Grid */}
        <section className="animate-pulse pt-8">
          <div className="h-8 w-40 bg-white/10 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[300px]">
                <div className="h-48 w-full bg-white/5"></div>
                <div className="p-5 space-y-3 flex-1 bg-white/5">
                  <div className="h-5 w-full bg-white/10 rounded"></div>
                  <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                  <div className="h-4 w-4/6 bg-white/5 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

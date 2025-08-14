import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgColor = ['#4f46e5', '#7c3aed', '#db2777', '#e11d48', '#ca8a04', '#0d9488'];
  const [modelOpen, setModelOpen] = React.useState('text');
  const [background, setBackground] = React.useState(bgColor[0]);
  const [text, setText] = React.useState('');
  const [media, setMedia] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/', 'video/'];
    if (!validTypes.some(type => file.type.startsWith(type))) {
      toast.error('Unsupported file type');
      return;
    }

    setMedia(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setModelOpen('media');
  };

  const handleCreateStory = async () => {
  
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API
    setShowModal(false);
    fetchStories();
  
};


  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/800 rounded-lg p-4">
        {/* HEADER */}
        <div className="text-center mb-4 flex items-center justify-between">
          <button onClick={() => setShowModal(false)} className="text-white p-2 cursor-pointer">
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10" />
        </div>

       {/* STORY PREVIEW SECTION */}
<div
  className="rounded-lg h-96 flex items-center justify-center relative"
  style={{ backgroundColor: background }}
>
  {modelOpen === 'text' ? (
    <textarea
      className="bg-transparent w-full h-full p-4 text-white text-lg focus:outline-none resize-none"
      placeholder="Write your story..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      {previewUrl && media ? (
        media.type?.startsWith('image') ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            onError={() => toast.error('Image failed to load')}
          />
        ) : media.type?.startsWith('video') ? (
          <video
            src={previewUrl}
            controls
            autoPlay
            muted
            className="w-full h-full object-contain rounded-lg"
            onError={() => toast.error('Video failed to load')}
          />
        ) : (
          <p className="text-red-500">Unsupported media type</p>
        )
      ) : (
        <p className="text-gray-500">No media selected</p>
      )}
    </div>
  )}
</div>


        {/* BACKGROUND COLOR SELECTOR */}
        <div className="flex mt-4 gap-2">
          {bgColor.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full ring-2 cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => setBackground(color)}
            />
          ))}
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex mt-4 gap-2">
          <button
            onClick={() => {
              setModelOpen('text');
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
              modelOpen === 'text'
                ? 'bg-white text-black shadow-md'
                : 'bg-zinc-800 text-white hover:bg-white hover:text-black hover:shadow-md'
            } cursor-pointer`}
          >
            <TextIcon size={18} /> Text
          </button>

          <div className="flex-1">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className={`w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                modelOpen === 'media'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-zinc-800 text-white hover:bg-white hover:text-black hover:shadow-md'
              } cursor-pointer`}
            >
              <Upload size={18} /> Photo/Video
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: 'Creating story...',
              success: <p>Story created successfully!</p>,
              error: (err) => `Error creating story: ${err.message}`,
            })
          }
          className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to bg-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
        >
          <Sparkle size={20} /> Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;

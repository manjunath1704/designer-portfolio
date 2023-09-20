import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function QuillEditor({ value, onChange }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
        ],
      }}
    />
  );
}


function CreateProject() {
  const { handleSubmit,control, register, errors } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="projectTitle"
          {...register('projectTitle', {required:'projectTitle is required'})}
        />
        {errors.projectTitle && <p>{errors.projectTitle.message}</p>}
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          {...register('description', {required:'Description is required'})}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Thumbnail:</label>
        <input
          type="file"
          name="thumbnail"
          {...register('thumbnail', {required:'Thumbnail is required'})}
        />
      </div>

      <div>
        <label>Images:</label>
        <input
          type="file"
          name="images"
          multiple
          {...register('images', {required:'Images are required'})}
        />
        {errors.images && <p>{errors.images.message}</p>}
      </div>

      <div>
        <label>Rich Text:</label>
        <Controller
          name="richText"
          control={control}
          defaultValue=""
          render={({ field }) => <QuillEditor {...field} />}
        />
        {errors.richText && <p>{errors.richText.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateProject;


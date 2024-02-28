import Product from '../model/productModel.js'
import ProductVariant from '../model/productVarientModel.js'
import cloudinary from 'cloudinary'
import CATEGORY from '../model/categoryModel.js'

//cloudinary configaration
cloudinary.config({
  cloud_name: 'dztburkwy',
  api_key: '182133815614938',
  api_secret: 'qz7-w8D4LZo3IV02cHqDEQRsqBs',
})

// Post
// api/v1/admin/addBaseProduct
// --- admin

export const addBaseProduct = async (req, res) => {
  console.log('addproduct body', req.body)
  try {
    const {title, category, description, brand } = req.body
    const product = new Product({
      name:title,
      category,
      description,
      brand,
    })
    await product.save()
    const products=await Product.find()
    res.status(201).json({ message: 'Product added successfully..!',products})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error..!' })
  }
}

export const addProductVariant = async (req, res) => {
  console.log("body",req.body)
  try {
    const {
      id,
      color,
      stock,
      regularPrice,
      productVarient,
      salePrice,
      specification,
      images,
    } = req.body

    // Save images into Cloudinary
    const cloudinaryUploadImage = async (fileToUpload) => {
      try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
          resource_type: 'auto',
        })
        return data.url; // Return the URL of the uploaded image
      } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error (cloudinary)')
      }
    }

    // Upload all images concurrently
    const uploadPromises = images.map((imageData) =>
      cloudinaryUploadImage(imageData)
    )
    const uploadedImageURLs = await Promise.all(uploadPromises)

    const productVariantDetails = new ProductVariant({
      productId: id,
      color,
      stock,
      regularPrice,
      varientName: productVarient,
      salePrice,
      specification,
      images: uploadedImageURLs,
    })

    await productVariantDetails.save()

    // Fetch all product variants after saving
    const productVariants = await ProductVariant.find()

    res.status(200).json({
      message: 'Product variant saved successfully!',
      productVariants // Consistent variable name
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error!' })
  }
}


// Get
// api/v1/admin/allfullProducts
// --- admin


export const getFullProducts = async (req, res) => {
  console.log("executed")
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
    ]);
   console.log(products)
    res.status(200).json({message:"full products ",products});
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
}
// Get
// api/v1/admin/Singleproducts
// --- admin

// export const getSingleProduct=async(req,res)=>{
//   try {
//     const {id}=req.body
//     const Singleproducts = await Product.findOne({id})
//     res.status(200).json({message:"success",Singleproducts});
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Internal Server error...!' })
//   }
// }



// Get
// api/v1/admin/products
// --- admin

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
}

// POSt
// api/v1/admin/add-category
// --- admin

export const addCategory = async (req, res) => {
  try {
    const { title, description } = req.body
    const category = new CATEGORY({
      title,
      description,
    })
    const savedCategory = await category.save()
    if(!savedCategory){
      return res.status(400).json({message:"error"})
    }
    const categories=await CATEGORY.find()
    res.status(200).json({ message: 'Category saved', categories})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
}

// Get
// api/v1/admim/categories
// --- admin

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CATEGORY.find()
    res.status(200).json({ message: 'Successfull', categories })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
}

// Get
// api/v1/admim/categories
// --- admin
export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.query
    const category = await CATEGORY.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    )
    const categories=await CATEGORY.find()
    console.log(categories)
    res.status(200).json({ success: true, categories })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
}

// PUT
// api/v1/admim/Editcategories
// --- admin
export const EditCategory=async(req,res)=>{
  try {
    const { id } = req.params;
    const { title, description } = req.body;


    const updatedCategory = await CATEGORY.findByIdAndUpdate(id, { title, description }, { new: true });
    console.log(updatedCategory)

    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    const categories=await CATEGORY.find()
    console.log("heheh",categories)
    res.status(200).json({ success: true, category: categories });
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
}


// GET
// api/v1/products
// --- users

  export const getProducts = async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: 'productvariants',
            localField: '_id',
            foreignField: 'productId',
            as: 'variants',
          },
        },
      ]);
      res.status(200).json(products);
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server error...!' })
    }
  }

// get
// api/v1/productDetails
// --- user

export const getProductDetails=async(req,res)=>{
  try{
    let  id = req.query.id;
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'productvariants',
          localField:'_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
    ]);

    products.map((product)=>{
      if(product._id==id){
       res.status(200).json({message:"product founded Successfully",product})
      }else{
        res.status(400).json({message:"product not found"})
      }
    })



  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
  
}